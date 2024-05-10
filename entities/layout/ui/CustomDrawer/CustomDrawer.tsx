import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../shared/const/tokens';
import { CustomLink } from '../../../../shared/ui/CustomLink/CustomLink';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom } from '../../../auth/model/auth.state';
import { loadProfileAtom } from '../../../user/model/user.state';
import { useEffect } from 'react';
import { UserMenu } from '../../../user/ui/UserMenu/UserMenu';

export function CustomDrawer(props: DrawerContentComponentProps) {
  const logout = useSetAtom(logoutAtom);
  const [profile, loadProfile] = useAtom(loadProfileAtom);

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
      <View style={styles.content}>
        <CloseDrawer {...props.navigation} />
        <Text>{profile.profile?.name}</Text>
        <UserMenu user={profile.profile} />
      </View>
      <View style={styles.footer}>
        <CustomLink href="/login" onPress={logout} text="Выход" />
        <Image
          style={styles.logo}
          source={require('../../../../assets/logo.png')}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  footer: {
    gap: 50,
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 160,
  },
});
