import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {TouchableOpacity, View, Button, Alert, ActivityIndicator, Modal, Text, StyleSheet, Image} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import RNFS, {readFile} from 'react-native-fs';

import {
  extractZipFile,
  jsonUserDataParser,
} from '../services/ZipPicker.service';
import { FollowerDataArray, FollowingDataArray } from '../screens/HomeScreen';


export const targetPath = `${RNFS.DownloadDirectoryPath}/instaUnfollower`;
const filesAbsPath = targetPath + '/connections/followers_and_following/';
type ZipFileProps = {
  navigation: StackNavigationProp<any, 'Home'>;
};
const ZipFilePickerForLostFollowers = (props: ZipFileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snapshotFollowers , setSnapshotFollowers] = useState<{
    type: "Following";
    data: FollowingDataArray;
} | {
    type: "Follower";
    data: FollowerDataArray;
} | undefined>(undefined)

  const [latestFollowers , setLatestFollowers] = useState<{
    type: "Following";
    data: FollowingDataArray;
} | {
    type: "Follower";
    data: FollowerDataArray;
} | undefined>(undefined)
  const onPressHandler = async () => {
    try {
    //   const res = await DocumentPicker.pick({
    //     type: [types.zip],
    //   });
    //   setIsLoading(true);

    //   await extractZipFile({
    //     sourcePath: res[0].uri,
    //     name:
    //       res[0].name != null
    //         ? res[0].name
    //         : `${Math.floor(Math.random() * 1000000)}`,
    //   });

    //   const followers = await readFile(
    //     filesAbsPath + 'followers_1.json',
    //     'utf8',
    //   ).catch(err => {
    //     setIsLoading(false);
    //     Alert.alert(err);
    //   });


    //   if (typeof followers !== 'string') {
    //     setIsLoading(false);
    //     return Alert.alert('Error something is wrong');
    //   }

    //   const parsedJsonFollowersUserData = jsonUserDataParser({
    //     type: 'Followers',
    //     content: followers,
    //   });
      
    //   setIsLoading(false);

      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setIsLoading(false);
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View>
      <View style={{
        marginBottom:12
      }}>
      <Button title="Pick snapshot" onPress={async ()=>{
        const res = await DocumentPicker.pick({
            type: [types.zip],
          });
          setIsLoading(true);
    
          await extractZipFile({
            sourcePath: res[0].uri,
            name:
              res[0].name != null
                ? res[0].name
                : `${Math.floor(Math.random() * 1000000)}`,
          });
    
          const followers = await readFile(
            filesAbsPath + 'followers_1.json',
            'utf8',
          ).catch(err => {
            setIsLoading(false);
            Alert.alert(err);
          });
    
    
          if (typeof followers !== 'string') {
            setIsLoading(false);
            return Alert.alert('Error something is wrong');
          }
    
          const parsedJsonFollowersUserData = jsonUserDataParser({
            type: 'Followers',
            content: followers,
          });
          setSnapshotFollowers(parsedJsonFollowersUserData)
          setIsLoading(false)
          if (
            parsedJsonFollowersUserData != null && latestFollowers !=null
          ) {
            props.navigation.navigate('LostFollowers', {
              latestFollowers: latestFollowers.data,
              snapshotFollowers:parsedJsonFollowersUserData.data
            });
          }
      }} />
      <Button title="Pick latest Zip file" onPress={async ()=>{
         const res = await DocumentPicker.pick({
            type: [types.zip],
          });
          setIsLoading(true);
    
          await extractZipFile({
            sourcePath: res[0].uri,
            name:
              res[0].name != null
                ? res[0].name
                : `${Math.floor(Math.random() * 1000000)}`,
          });
    
          const followers = await readFile(
            filesAbsPath + 'followers_1.json',
            'utf8',
          ).catch(err => {
            setIsLoading(false);
            Alert.alert(err);
          });
    
    
          if (typeof followers !== 'string') {
            setIsLoading(false);
            return Alert.alert('Error something is wrong');
          }
    
          const parsedJsonFollowersUserData = jsonUserDataParser({
            type: 'Followers',
            content: followers,
          });
          setLatestFollowers(parsedJsonFollowersUserData)
          setIsLoading(false)
          if (
            parsedJsonFollowersUserData != null && snapshotFollowers !=null
          ) {
            props.navigation.navigate('LostFollowers', {
              latestFollowers: parsedJsonFollowersUserData.data,
              snapshotFollowers:snapshotFollowers.data
            });
          }
      }} />
      </View>
      <View>
      </View>
      {isLoading === true && (
        <View>
          <ActivityIndicator size={52} />
        </View>
      )}
    </View>
  );
};

export default ZipFilePickerForLostFollowers;
