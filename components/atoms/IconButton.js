import React from 'react';
import { IconButton as RNPIconButton } from 'react-native-paper';
import Icon from './Icon';

const IconButton = ({ label, onPress, ...rest }) => {
    return (
        <RNPIconButton icon={() => <Icon label={label} {...rest} />} onPress={onPress} />
    )
}

export default IconButton;