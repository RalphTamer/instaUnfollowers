import {useEffect, useState} from 'react';
import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FollowerDataArray, FollowingDataArray} from './HomeScreen';
import RNPickerSelect from 'react-native-picker-select';
import {RouteProp} from '@react-navigation/native';

type DetailsScreenProps = {
  route: RouteProp<any, 'FollowersInfo'>;
};
function FollowersInfoScreen(props: DetailsScreenProps): JSX.Element {
  const {route} = props;

  const [followersData , setFollowersData] = useState<{
    name:string,
    url:string
  }[] | null>(null)

  const {followersParsedJsonData, followingParsedJsonData,previousFollowersParsedJsonData} = route.params as {
    followersParsedJsonData: FollowerDataArray;
    followingParsedJsonData?: FollowingDataArray;
    previousFollowersParsedJsonData?: FollowerDataArray;
  };

  if (followersParsedJsonData == null) {
    return <div>nothing to see here</div>;
  }

 
  const getOriginalDataList = () =>{
    const notFollowingYou: {
      name: string;
      url: string;
    }[] = [];

    if(followingParsedJsonData != null){
      followingParsedJsonData.forEach(person => {
        if (
          followersParsedJsonData.find(
            p => p.followerName === person.followingName,
          )
        ) {
          // do notin
        } else {
          notFollowingYou.push({
            name: person.followingName,
            url: person.followingUrl,
          });
        }
      })
      return notFollowingYou
    }else if(previousFollowersParsedJsonData != null){
      
      previousFollowersParsedJsonData.forEach(person => {
        if (
          followersParsedJsonData.find(
            p => p.followerName === person.followerName,
          )
        ) {
          // do notin
        } else {
          notFollowingYou.push({
            name: person.followerName,
            url: person.followerUrl,
          });
        }
      })
  
      return notFollowingYou
    }else{
      throw new Error("something not right!!");
    }
    
  }

  useEffect(()=>{
    setFollowersData(getOriginalDataList()) 
    
  },[])


  return (
    <View style={{flex:1}}>
      <ScrollView>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}>
        {followersData != null &&
          followersData.map((person, i) => {
            return (
              <View
                key={person.name + i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                <Text style={{
                  color:"#000",
                  fontWeight:"bold"
                }}>{person.name}</Text>
                <Button
                  onPress={() => {
                    Linking.openURL(person.url);
                  }}
                  title="Go to profile"
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
    </View>
  );
}

export default FollowersInfoScreen;
