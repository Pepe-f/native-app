import { View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Colors } from '../../shared/const/tokens';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { CourseCard } from '../../widgets/course/ui/CourseCard/CourseCard';

export default function MyCourses() {
  const { isLoading, courses } = useAtomValue(courseAtom);
  const loadCourse = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourse();
  }, []);

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.item}>
        <CourseCard {...item} />
      </View>
    );
  };

  return (
    <>
      {isLoading && (
        <ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />
      )}
      {courses.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={Colors.primary}
              titleColor={Colors.primary}
              refreshing={isLoading}
              onRefresh={loadCourse}
            />
          }
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
  activity: {
    marginTop: 30,
  },
});
