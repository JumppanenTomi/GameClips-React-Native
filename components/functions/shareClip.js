import {Share} from 'react-native';
const shareClip =  () => {
  const onShare = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert('Successful sharing');
        } else {
          alert('Sharing canceled');
        }
      } else if (result.action === Share.dismissedAction) {
        alert('Sharing canceled');
      }
    } catch (error) {
      alert('Error occurred while sharing');
      console.log(error)
    }
  };
  return {onShare}
};
export default shareClip;
