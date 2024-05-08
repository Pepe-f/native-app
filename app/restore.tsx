import { Link } from 'expo-router';
import { Text } from 'react-native';
import { Colors } from '../shared/const/tokens';

export default function Restore() {
  return (
    <Link href={'/'}>
      <Text style={{ color: Colors.white }}>Restore</Text>
    </Link>
  );
}
