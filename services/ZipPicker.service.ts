import {unzip} from 'react-native-zip-archive';
import {targetPath} from '../components/ZipFilePicker';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
import {FollowerDataArray, FollowingDataArray} from '../screens/HomeScreen';

export const extractZipFile = async (args: {
  sourcePath: string;
  name: string;
}) => {
  const {sourcePath, name} = args;

  // Check if the target folder exists
  const targetExists = await RNFS.exists(targetPath);

  // If the target folder exists, delete it to override the contents
  if (targetExists) {
    try {
      await RNFS.unlink(targetPath);
    } catch (error) {
      console.error('Error deleting existing folder:', error);
      return;
    }
  }

  // Create the target folder
  await RNFS.mkdir(targetPath);

  // Extract the ZIP file to the target folder
  try {
    // const success = await RNZipArchive.unzipAssets(sourcePath, targetPath);

    const localPath = `${RNFS.TemporaryDirectoryPath}/${name}`;
    await RNFS.copyFile(sourcePath, localPath)
      .then(() => {
        console.log(`File copied to ${localPath}`);
      })
      .catch(error => console.log(error));

    await unzip(localPath, targetPath)
      .then(() => console.log('Unzipped'))
      .catch(error => console.log(error));
  } catch (error) {
    console.error('Error extracting ZIP:', error);
  }
};

export const jsonUserDataParser = (args: {
  content: string;
  type: 'Following' | 'Followers';
}) => {
  const {type, content} = args;

  const parsedJson = JSON.parse(content);

  if (type === 'Following') {
    const followingParsed: FollowingDataArray = [];

    if (parsedJson.relationships_following == null) {
      Alert.alert('please make sure you selected the correct file');
      return;
    }
    parsedJson.relationships_following.forEach(
      (following: {
        media_list_data: [];
        string_list_data: [{href: string; timestamp: number; value: string}];
        title: string;
      }) => {
        if (following.string_list_data[0] == null) {
          Alert.alert('please make sure you selected the correct file');
          return;
        }
        followingParsed.push({
          followingName: following.string_list_data[0].value,
          followingUrl: following.string_list_data[0].href,
        });
      },
    );
    const userFollowingJsonData = {
      type: 'Following' as 'Following',
      data: followingParsed,
    };

    return userFollowingJsonData;
    // setUserParsedJsonData(userFollowingJsonData);
  } else {
    const followersParsed: FollowerDataArray = [];
    if (parsedJson[0] == null) {
      Alert.alert('please make sure you selected the correct file');
      return;
    }
    parsedJson.forEach(
      (follower: {
        media_list_data: [];
        string_list_data: [{href: string; timestamp: number; value: string}];
        title: string;
      }) => {
        if (follower.string_list_data[0] == null) {
          Alert.alert('please make sure you selected the correct file');
          return;
        }
        followersParsed.push({
          followerName: follower.string_list_data[0].value,
          followerUrl: follower.string_list_data[0].href,
        });
      },
    );

    const userFollowerJsonData = {
      type: 'Follower' as 'Follower',
      data: followersParsed,
    };

    return userFollowerJsonData;
    // setUserParsedJsonData(userFollowerJsonData);
  }
};
