import { View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Colors } from '../../shared/const/tokens';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import { useEffect } from 'react';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { CourseCard } from '../../widgets/course/ui/CourseCard/CourseCard';
import { Button } from '../../shared/ui/Button/Button';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function MyCourses() {
  const { isLoading, courses } = useAtomValue(courseAtom);
  const loadCourse = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourse();
  }, []);

  const allowsNotification = async () => {
    const settings = await Notifications.getPermissionsAsync();

    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  const requestPermissions = async () => {
    return Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
  };

  const scheduleNotification = async () => {
    const granted = await allowsNotification();

    if (!granted) {
      await requestPermissions();
    }

    if (Device.isDevice) {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      console.log(token);
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Не забудь пройти курс',
          body: 'Не забывайте учиться каждый день!',
          data: { alias: 'typescript' },
        },
        trigger: {
          seconds: 5,
        },
      });
    }
  };

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
      <Button text="Напомнить" onPress={scheduleNotification} />
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
