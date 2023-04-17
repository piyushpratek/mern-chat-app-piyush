import { Badge, Box } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { UserPublicType, UserType } from '../../types';

type UserBadgeItemType = {
  user: UserPublicType;
  handleFunction: Function;
  admin: Partial<UserType>;
};

const UserBadgeItem = ({ user, handleFunction, admin }: UserBadgeItemType) => {
  return (
    <Box
      px={2}
      py={1}
      // variant='solid'
      borderRadius='lg'
      m={1}
      mb={2}
      fontSize={12}
      // colorScheme='purple'
      cursor='pointer'
      onClick={handleFunction as any}
    >
      {user.name}
      {admin._id === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
