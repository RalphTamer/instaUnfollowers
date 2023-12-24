import {useState} from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from 'react-native';

type Props = {
    text : string
    onPress:()=>void
}

const Button = (props:Props) => {
    const [isLoading , setIsLoading] = useState<boolean>(false)

    return ( 
        <View
        style={{
            marginTop:10,
            marginBottom:10,
            backgroundColor:"#ccc"
          }}>
            <Text style={{
                 paddingLeft:30,
                 paddingRight:30,
                 paddingTop:10,
                 paddingBottom:10,
            }}
             onPress={
                ()=>{
                    setIsLoading(true)
                    props.onPress()
                    setIsLoading(false)
                }
                }>
              PROCEED
            </Text>
          </View>
     );
}
 
export default Button;