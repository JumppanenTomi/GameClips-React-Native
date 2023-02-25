import LogoIcon from 'assets/icons/logo.svg';
import ArrowRightIcon from 'assets/icons/arrow-right.svg';
import EyeIcon from 'assets/icons/eye.svg';
import EyeSlashIcon from 'assets/icons/eye-slash.svg';
import HomeIcon from 'assets/icons/home.svg';
import HomeWhiteIcon from 'assets/icons/home-white.svg';
import DiscoverIcon from 'assets/icons/discover.svg';
import DiscoverWhiteIcon from 'assets/icons/discover-white.svg';
import HeartIcon from 'assets/icons/heart.svg';
import HeartWhiteIcon from 'assets/icons/heart-white.svg';
import ProfileIcon from 'assets/icons/profile.svg';
import ProfileWhiteIcon from 'assets/icons/profile-white.svg';
import MoreIcon from 'assets/icons/more.svg';
import VideoIcon from 'assets/icons/video.svg';
import MessageIcon from 'assets/icons/message.svg'
import ShareIcon from 'assets/icons/share.svg'
import SendIcon from 'assets/icons/send.svg'

const Icon = ({ label, active, size }) => {
  const commonProps = size ? { width: size, height: size } : {};

  switch (label.toLowerCase()) {
    case 'logo':
      return <LogoIcon {...commonProps} />
    case 'arrow-right':
      return <ArrowRightIcon {...commonProps} />
    case 'send':
      return <SendIcon {...commonProps} />
    case 'message':
      return <MessageIcon {...commonProps} />
    case 'share':
      return <ShareIcon {...commonProps} />
    case 'eye':
      return <EyeIcon {...commonProps} />
    case 'eye-slash':
      return <EyeSlashIcon {...commonProps} />
    case 'home':
      return active ? <HomeWhiteIcon /> : <HomeIcon />;
    case 'browse':
      return !active ? <DiscoverIcon size={size} /> : <DiscoverWhiteIcon />;
    case 'favorites':
      return !active ? <HeartIcon {...commonProps} /> : <HeartWhiteIcon {...commonProps} />;
    case 'profile':
      return !active ? <ProfileIcon size={size} /> : <ProfileWhiteIcon />;
    case 'more':
      return <MoreIcon />;
    case 'video':
      return <VideoIcon />;
    default:
      return null;
  }
}

export default Icon;