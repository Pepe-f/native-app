import { Image, StyleSheet, Text, View } from 'react-native';
import { User } from '../../model/user.model';
import { Colors, Fonts, Gaps } from '../../../../shared/const/tokens';

export function UserMenu({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {user.photo ? (
        <Image style={styles.image} source={{ uri: user.photo }} />
      ) : (
        <Image source={require('../../../../assets/images/avatar.png')} />
      )}
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Gaps.g8,
    marginTop: 30,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
});
