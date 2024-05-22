import AppFlex from '@components/AppFlex/AppFlex';
import AppIcon from '@components/AppIcon/AppIcon';
import AppText from '@components/AppText/AppText';
import { COLOURS } from '@theme/colours';
import normalize from '@utils/normalize';
import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface IToDoCard {
  description: string;
  isDone: boolean;
  onPress: () => void;
  onCheck: () => void;
  onPressDelete: () => void;
  isDeleteLoading?: boolean;
}

const ToDoCard: React.FC<IToDoCard> = memo(({
  description,
  isDone,
  onPress,
  onCheck,
  onPressDelete,
  isDeleteLoading,
}) => {
  return (
    <AppFlex flexDirection="row" alignItems="center" style={styles.card}>
      <TouchableOpacity onPress={onCheck}>
        <AppFlex style={[styles.box]}>
          {
            isDone ?
              <AppIcon icon="check-icon" width={normalize(18)} height={normalize(18)} />
              : null
          }
        </AppFlex>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.innerCard}>
        <AppFlex flexDirection="row" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
          <AppText>
            {description}
          </AppText>
          {
            isDone ?
              <AppFlex style={styles.bgDone}>
                <AppText colour="green200">
                  Done
                </AppText>
              </AppFlex>
              : null
          }
        </AppFlex>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDelete} style={styles.deleteBtn}>
        {
          isDeleteLoading ?
            <ActivityIndicator size="small" color={COLOURS.primary} />
            :
            <AppIcon icon="delete-icon" width={normalize(18)} height={normalize(18)} fill={COLOURS.red} />
        }
      </TouchableOpacity>
    </AppFlex>
  );
});

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },
  card: {
    paddingHorizontal: normalize(16),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOURS.gray100,
    gap: 6,
    height: normalize(58, 'height'),
    alignItems: 'center',
  },
  innerCard: {
    flex: 1,
    height: '100%',
  },
  box: {
    width: normalize(24),
    height: normalize(24),
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.gray100,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  wrapper: {
    flexGrow: 1,
    paddingVertical: normalize(12, 'height'),
    backgroundColor: COLOURS.white,
    paddingHorizontal: normalize(16),
  },
  center: {
    justifyContent: 'center',
  },
  bgDone: {
    padding: normalize(6),
    borderRadius: 6,
    backgroundColor: COLOURS.green100,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: normalize(1),
    marginRight: normalize(-6),
  }
});

export default ToDoCard;
