import {useEffect, useState} from 'react';
import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FollowerDataArray, FollowingDataArray} from './HomeScreen';
import RNPickerSelect from 'react-native-picker-select';
import {RouteProp} from '@react-navigation/native';

type DetailsScreenProps = {
  route: RouteProp<any, 'LostFollowers'>;
};
function LostFollowersScreen(props: DetailsScreenProps): JSX.Element {
  const {route} = props;
  const [followersData , setFollowersData] = useState<{
    name:string,
    url:string
  }[] | null>(null)
  const [selectedValue , setSelectedValue] = useState<string>()
  const {latestFollowers, snapshotFollowers} = route.params as {
    latestFollowers: FollowerDataArray;
    snapshotFollowers: FollowerDataArray;
  };

  if (latestFollowers == null || snapshotFollowers == null) {
    return <div>nothing to see here</div>;
  }

 

  const getOriginalDataList = () =>{
    const lostFollowers: {
      name: string;
      url: string;
    }[] = [];
    
    snapshotFollowers.forEach(person => {
      if (
        latestFollowers.find(
          p => p.followerName === person.followerName,
        )
      ) {
        // do notin
      } else {
        lostFollowers.push({
          name: person.followerName,
          url: person.followerUrl,
        });
      }
    })

    return lostFollowers
  }
  
  useEffect(()=>{
    setFollowersData(getOriginalDataList()) 
  },[])

  const items = [
    { label: 'original', value: 'original' },
    { label: 'sort by A-Z', value: 'AZ' },
    { label: 'sort by Z-A', value: 'ZA' },
  ];
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
  });

  return (
    <View style={{flex:1}}>
      <View style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
      }}>
        <Text>SORT</Text>
        <RNPickerSelect
        
        items={items}
        onValueChange={
          (value) => 
        {
          if (followersData == null)
            return

          if(value === "AZ"){
            const sorted =  [...followersData].sort((a, b) => a.name.localeCompare(b.name))
            setFollowersData(sorted)
          }else if(value === "ZA"){
            const sorted =  [...followersData].sort((a, b) => b.name.localeCompare(a.name))
            setFollowersData(sorted)
          }else if(value === "original"){
            setFollowersData(getOriginalDataList())
          }
          setSelectedValue(value)
        }
        }
        value={selectedValue}
        style={pickerSelectStyles}
      />
      </View>
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

export default LostFollowersScreen;
