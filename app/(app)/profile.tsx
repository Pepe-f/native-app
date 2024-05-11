import { View, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Gaps } from '../../shared/const/tokens';
import { useEffect, useState } from 'react';
import { ImageUploader } from '../../shared/ui/ImageUploader/ImageUploader';
import { Avatar } from '../../entities/user/ui/Avatar/Avatar';
import { useAtom } from 'jotai';
import { updateProfileAtom } from '../../entities/user/model/user.state';
import { Button } from '../../shared/ui/Button/Button';

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [profile, updateProfile] = useAtom(updateProfileAtom);

  useEffect(() => {
    if (profile && profile.profile?.photo) {
      setImage(profile.profile?.photo);
    }
  }, [profile]);

  const submitProfile = () => {
    if (!image) {
      return;
    }
    updateProfile({ photo: image });
  };

  const shareProfile = async () => {
    const isSharingAvailable = await Sharing.isAvailableAsync();

    if (!isSharingAvailable) {
      return;
    }

    await Sharing.shareAsync('https://purpleschool.ru', {
      dialogTitle: 'Поделиться профилем',
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Avatar image={image} />
        <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
      </View>
      <Button text="Сохранить" onPress={submitProfile} />
      <Button text="Поделиться" onPress={shareProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: Gaps.g20,
  },
  container: {
    flexDirection: 'row',
    gap: Gaps.g20,
    alignItems: 'center',
  },
});
