import { View, Text } from 'react-native';
import { Colors } from '../../shared/const/tokens';
import { Button } from '../../shared/ui/Button/Button';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../entities/auth/model/auth.state';

export default function MyCourses() {
  const logout = useSetAtom(logoutAtom);

  return (
    <View>
      <Text style={{ color: Colors.white }}>MyCourses</Text>
      <Button text="Выход" onPress={logout} />
    </View>
  );
}
