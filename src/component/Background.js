import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomColors from '../../themes/CustomColors';

const Background = (props) => {
    return ( 
        <LinearGradient
        start={{ x: -0.5, y: 0.8 }}
        end={{ x: 2.5, y: 0.3 }}
        colors={[CustomColors.backRed, CustomColors.backBlue, CustomColors.backBlue]}
        style={{flex: 1}}>
            {props.children}
        </LinearGradient>
     );
}
 
export default Background;