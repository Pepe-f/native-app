import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Colors, Fonts, Radius } from '../../const/tokens';
import { useState } from 'react';
import EyeOpenedIcon from '../../../assets/icons/eye-opened';
import EyeClosedIcon from '../../../assets/icons/eye-closed';

export function Input({ isPassword, ...props }: TextInputProps & { isPassword?: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.gray}
        secureTextEntry={isPassword && !isPasswordVisible}
        {...props}
      />
      {isPassword && (
        <Pressable onPress={() => setIsPasswordVisible((prev) => !prev)} style={styles.eyeIcon}>
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 58,
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    borderRadius: Radius.r10,
    fontSize: Fonts.f16,
    color: Colors.white,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});
