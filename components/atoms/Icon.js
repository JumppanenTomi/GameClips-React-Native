import HomeSvg from 'assets/icons/home.svg'
import HomeWhiteSvg from 'assets/icons/home-white.svg'
import DiscoverSvg from 'assets/icons/discover.svg';
import DiscoverWhiteSvg from 'assets/icons/discover-white.svg';
import HeartSvg from 'assets/icons/heart.svg';
import HeartWhiteSvg from 'assets/icons/heart-white.svg';
import ProfileSvg from 'assets/icons/profile.svg';
import ProfileWhiteSvg from 'assets/icons/profile-white.svg';

const Icon = ({ label, active, size }) => {
    if (label === 'Home') {
        return active ? <HomeWhiteSvg /> : <HomeSvg />
    } else if (label === 'Browse') {
        return !active ? <DiscoverSvg size={size} /> : <DiscoverWhiteSvg />
    } else if (label === 'Favorites') {
        return !active ? <HeartSvg size={size} /> : <HeartWhiteSvg />
    } else if (label === 'Profile') {
        return !active ? <ProfileSvg size={size} /> : <ProfileWhiteSvg />
    }
}

export default Icon;