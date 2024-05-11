import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Orientation } from 'expo-screen-orientation';
import { Input } from '../shared/ui/Input/Input';
import { Colors, Gaps } from '../shared/const/tokens';
import { Button } from '../shared/ui/Button/Button';
import { useEffect, useState } from 'react';
import { ErrorNotification } from '../shared/ui/ErrorNotification/ErrorNotification';
import { CustomLink } from '../shared/ui/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks/useScreenOrientation';

export default function App() {
  const [localError, setLocalError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const orientation = useScreenOrientation();

  const [{ access_token, error, isLoading }, login] = useAtom(loginAtom);

  const submit = () => {
    if (!email) {
      setLocalError('Не введен email');
      return;
    }

    if (!password) {
      setLocalError('Не введен пароль');
      return;
    }

    login({ email, password });
  };

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  useEffect(() => {
    if (access_token) {
      router.replace('/(app)');
    }
  }, [access_token]);

  return (
    <View style={styles.container}>
      <ErrorNotification error={localError} />
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.form}>
          <View
            style={{
              ...styles.inputs,
              flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
            }}
          >
            <Input
              placeholder="Email"
              onChangeText={setEmail}
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? 'auto'
                    : Dimensions.get('window').width / 2 - 16 - 48,
              }}
            />
            <Input
              placeholder="Пароль"
              isPassword
              onChangeText={setPassword}
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? 'auto'
                    : Dimensions.get('window').width / 2 - 16 - 48,
              }}
            />
          </View>
          <Button text="Войти" onPress={submit} isLoading={isLoading} />
        </View>
        <CustomLink href={'/restore'} text="Восстановить пароль" />
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
  inputs: {
    gap: Gaps.g16,
  },
});
