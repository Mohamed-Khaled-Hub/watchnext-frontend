import {
    HiBookmark,
    HiEye,
    HiHeart,
    HiOutlineBookmark,
    HiOutlineEye,
    HiOutlineHeart,
} from 'react-icons/hi2'

export const ACTION_ICONS = {
    like: {
        default: HiOutlineHeart,
        active: HiHeart,
    },
    watch: {
        default: HiOutlineEye,
        active: HiEye,
    },
    watchlist: {
        default: HiOutlineBookmark,
        active: HiBookmark,
    },
}
