import { View, StyleSheet } from 'react-native';
import { Gaps } from '../../shared/const/tokens';
import { useState } from 'react';
import { ImageUploader } from '../../shared/ui/ImageUploader/ImageUploader';
import { Avatar } from '../../entities/user/ui/Avatar/Avatar';

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <View>
      <View style={styles.container}>
        <Avatar image={image} />
        <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Gaps.g20,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
