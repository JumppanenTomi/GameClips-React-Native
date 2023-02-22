import React from 'react';
import {Controller} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const FormInput = ({control, name, label, rules, errorText, ...rest}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            label={label}
            autoCapitalize="none"
            mode="outlined"
            outlineStyle={styles.outline}
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            theme={{
              colors: {
                primary: 'rgba(255, 255, 255, 0.5)',
              },
            }}
            textColor="#FFF"
            {...rest}
          />
        )}
        name={name}
        defaultValue=""
        rules={rules}
      />
      {errorText && (
        <HelperText type="error" visible={true}>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8
  },
  textInput: {
    backgroundColor: '#0D0D25',
    paddingHorizontal: 8
  },
  outline: {
    borderRadius: 100,
  },
});

export default FormInput;
