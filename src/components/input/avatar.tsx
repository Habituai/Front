import { Radio } from '@mui/material';
import avatar1 from '../../assets/avatars/1.jpg';
import avatar2 from '../../assets/avatars/2.jpg';
import avatar3 from '../../assets/avatars/3.jpg';
import avatar4 from '../../assets/avatars/4.jpg';
import avatar5 from '../../assets/avatars/5.jpg';
import avatar6 from '../../assets/avatars/6.jpg';

interface AvatarRadioButtonProps {
    value: number;
    image: string;
}

export const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function AvatarRadioButton({ value, image }: AvatarRadioButtonProps) {
    const AvatarButton = () => <img src={image} alt="avatar" className="w-28 xl:w-32 border-4 bg-white" />;
    const CheckedAvatarButton = () => (
        <img src={image} alt="avatar" className="w-28 xl:w-32 border-4 border-primaryDark" />
    );

    return <Radio disableRipple value={value} icon={<AvatarButton />} checkedIcon={<CheckedAvatarButton />} />;
}
