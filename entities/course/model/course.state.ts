import { atom } from 'jotai';
import { StudentCourseDescription } from './course.model';
import axios, { AxiosError } from 'axios';
import { authAtom } from '../../auth/model/auth.state';
import { API } from '../api/api';

export const courseAtom = atom<CourseState>({
  courses: [],
  isLoading: false,
  error: null,
});

export const loadCourseAtom = atom(
  (get) => get(courseAtom),
  async (get, set) => {
    try {
      const { access_token } = await get(authAtom);

      set(courseAtom, {
        isLoading: true,
        courses: [],
        error: null,
      });

      const { data } = await axios.get<StudentCourseDescription[]>(API.my, {
        params: {
          studentCourse: 'dontMy',
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      set(courseAtom, {
        isLoading: false,
        courses: data,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(courseAtom, {
          courses: [],
          isLoading: false,
          error: error.response?.data.message,
        });
      }
    }
  },
);

export interface CourseState {
  courses: StudentCourseDescription[];
  isLoading: boolean;
  error: string | null;
}
