import React from 'react';
import {Controller} from 'react-hook-form';
import {HelperText, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const FormInput = ({control, name, label, errorText, ...rest}) => {
  return (
    <>
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
      />
      {errorText && (
        <HelperText type="error" visible={true}>
          {errorText}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: '#0D0D25',
    marginTop: 12,
    marginBottom: 12,
  },
  outline: {
    borderRadius: 100,
  },
});

export default FormInput;
