import { Image, StyleSheet, Text, View } from 'react-native';
import { Input } from './shared/ui/Input/Input';
import { Colors, Gaps } from './shared/const/tokens';
import { Button } from './shared/ui/Button/Button';
import { useState } from 'react';
import { ErrorNotification } from './shared/ui/ErrorNotification/ErrorNotification';

export default function App() {
  const [error, setError] = useState<string | undefined>();

  const alert = () => {
    setError('Неверный логин или пароль');
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={error} />
      <View style={styles.content}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.form}>
          <Input placeholder="Email" />
          <Input placeholder="Пароль" isPassword />
          <Button text="Войти" onPress={alert} />
        </View>
        <Text>Восстановить пароль</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 55,
    backgroundColor: Colors.black,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },
  logo: {
    width: 220,
  },
  form: {
    alignSelf: 'stretch',
    gap: Gaps.g16,
  },
});
