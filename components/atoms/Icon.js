import LogoIcon from 'assets/icons/logo.svg';
import ArrowBackIcon from 'assets/icons/arrow-back.svg';
import ArrowNextIcon from 'assets/icons/arrow-next.svg';
import ArrowRightIcon from 'assets/icons/arrow-right.svg';
import EyeIcon from 'assets/icons/eye.svg';
import EyeSlashIcon from 'assets/icons/eye-slash.svg';
import HomeIcon from 'assets/icons/home.svg';
import DiscoverIcon from 'assets/icons/discover.svg';
import HeartIcon from 'assets/icons/heart.svg';
import HeartFillIcon from 'assets/icons/heart-fill.svg';
import ProfileIcon from 'assets/icons/profile.svg';
import ProfileFillIcon from 'assets/icons/profile-fill.svg';
import MoreIcon from 'assets/icons/more.svg';
import VideoIcon from 'assets/icons/video.svg';
import MessageIcon from 'assets/icons/message.svg';
import ShareIcon from 'assets/icons/share.svg';
import SendIcon from 'assets/icons/send.svg';
import SearchIcon from 'assets/icons/search.svg';
import CloseIcon from 'assets/icons/close.svg';

const Icon = ({label, size, color}) => {
  const style = {color: color || '#FFF'};
  const commonProps = {
    ...(size ? {width: size, height: size} : {}),
    ...style,
  };

  switch (label.toLowerCase()) {
    case 'logo':
      return <LogoIcon {...commonProps} />;
    case 'arrow-right':
      return <ArrowRightIcon {...commonProps} />;
    case 'arrow-back':
      return <ArrowBackIcon {...commonProps} />;
    case 'arrow-next':
      return <ArrowNextIcon {...commonProps} />;
    case 'send':
      return <SendIcon {...commonProps} />;
    case 'close':
      return <CloseIcon {...commonProps} />;
    case 'search':
      return <SearchIcon {...commonProps} />;
    case 'message':
      return <MessageIcon {...commonProps} />;
    case 'share':
      return <ShareIcon {...commonProps} />;
    case 'eye':
      return <EyeIcon {...commonProps} />;
    case 'eye-slash':
      return <EyeSlashIcon {...commonProps} />;
    case 'home':
      return <HomeIcon {...commonProps} />;
    case 'browse':
      return <DiscoverIcon {...commonProps} />;
    case 'favorites':
      return <HeartIcon {...commonProps} />;
    case 'heart':
      return <HeartIcon {...commonProps} />;
    case 'heart-fill':
      return <HeartFillIcon {...commonProps} />;
    case 'profile':
      return <ProfileIcon {...commonProps} />;
    case 'profile-fill':
      return <ProfileFillIcon {...commonProps} />;
    case 'more':
      return <MoreIcon {...commonProps} />;
    case 'video':
      return <VideoIcon {...commonProps} />;
    default:
      return null;
  }
};

export default Icon;
