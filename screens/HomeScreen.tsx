import {useEffect} from 'react';
import {Text, View } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import ZipFilePickerForNonFollowers from '../components/ZipFilePickerForNonFollowers';
import ZipFilePickerForLostFollowers from '../components/ZipFilePickerForLostFollowers';


export type FollowerDataArray = Array<{
  followerName: string,
  followerUrl: string
}> 

export type FollowingDataArray = Array<{
  followingName: string;
  followingUrl: string;
}>

export type UserInfoArray = {
  type:"Follower",
  data : FollowerDataArray
}
|
{
  type:"Following",
  data:FollowingDataArray
}
| null
 

type HomeScreenProps = {
  navigation: StackNavigationProp<any, 'Home'>;
}

function HomeScreen(props: HomeScreenProps): JSX.Element {
  
  const {navigation} = props;
  
  useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        console.log('trying to requet storage permission');

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Required',
            message: 'This app needs access to your storage to use files.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
        } else {
          console.log('Storage Permission Denied.');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestStoragePermission();
  }, []);

  

  return (
    <View style={{flex: 1}}>
  
      <View style={{flex:1 , top:"40%"}}>
        <View style={{marginRight:12,marginLeft:12}}>
        <Text style={{fontSize:26,fontWeight:"bold",textAlign:"center",marginBottom:16}}>Instagram Unfollower</Text>
        <Text>Check for not following you back</Text>
        <ZipFilePickerForNonFollowers navigation={navigation}/>
        <Text>Check for lost followers</Text>
        <ZipFilePickerForLostFollowers navigation={navigation}/>
        </View>
      </View>
    
    </View>
  );
}

export default HomeScreen;
