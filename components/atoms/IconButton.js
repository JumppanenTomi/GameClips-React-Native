import React from 'react';
import { IconButton as RNPIconButton } from 'react-native-paper';
import Icon from './Icon';

const IconButton = ({ ...rest }) => {
    return (
        <RNPIconButton icon={() => <Icon {...rest} />} />
    )
}

export default IconButton;