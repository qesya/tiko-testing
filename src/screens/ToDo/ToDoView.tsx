import AppButton from '@components/AppButton/AppButton';
import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import AppTextInput from '@components/AppTextInput/AppTextInput';
import Layout from '@components/Layout/Layout';
import { GetTodoResponse, TodoItem } from '@hooks/selectors/useGetToDoAPI';
import normalize from '@utils/normalize';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet'
import { COLOURS } from '@theme/colours';
import AppIcon from '@components/AppIcon/AppIcon';
import ToDoCard from '@components/ToDoCard/ToDoCard';

interface IToDoView {
  onChange: (value: string) => void;
  onChangeUpdate: (value: string) => void;
  value: string;
  onCreateTodo: () => void;
  isLoading?: boolean;
  todoList: GetTodoResponse | undefined;
  isLoadingTodo?: boolean;
  isLoadingUpdateTodo?: boolean;
  onUpdateCheckItem: (item: TodoItem) => void;
  onPressItem: (item: TodoItem) => void;
  selectedValue: string;
  onUpdateToDo: () => void;
  onPressDelete: (id: number) => void;
  isDeleteLoading?: boolean;
  onPressLogout: () => void;
}

const ToDoView = ({
  onChange,
  value,
  onCreateTodo,
  todoList,
  isLoading,
  isLoadingTodo,
  onUpdateCheckItem,
  onPressItem,
  selectedValue,
  isLoadingUpdateTodo,
  onUpdateToDo,
  onChangeUpdate,
  onPressDelete,
  isDeleteLoading,
  onPressLogout
}: IToDoView) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const updateSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "30%", "30%"], [])
  const [tempId, setTempId] = useState<number>(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
      />
    ),
    []
  );

  useEffect(() => {
    if (isLoadingTodo === false) {
      bottomSheetRef.current?.close();
    }
  }, [isLoadingTodo]);

  useEffect(() => {
    if (isLoadingUpdateTodo === false) {
      updateSheetRef.current?.close();
    }
  }, [isLoadingUpdateTodo]);

  return (
    <Layout isScrollable={false}>
      <AppFlex flex={1}>
        <AppFlex flexDirection="row" alignItems="center" justifyContent="space-between">
          <AppText bold style={styles.txtHeader}>😎 Personal Space</AppText>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.snapToIndex(2)}>
            <AppIcon
              icon="plus-icon"
              fill={COLOURS.primary}
            />
          </TouchableOpacity>
        </AppFlex>
        {
          isLoading ?
            <AppFlex flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator size="large" color={COLOURS.primary} />
              <AppText style={{ marginTop: normalize(12, 'height') }}>Loading...</AppText>
            </AppFlex>
            :
            <FlatList
              data={todoList}
              style={styles.toDoWrapper}
              renderItem={({ item }) => {
                return (
                  <ToDoCard
                    description={item.description}
                    isDone={item.done}
                    onPress={() => {
                      onPressItem({
                        description: item.description,
                        done: item.done,
                        id: item.id
                      })
                      updateSheetRef.current?.snapToIndex(2);
                    }}
                    onCheck={() => onUpdateCheckItem({
                      description: item.description,
                      done: !item.done,
                      id: item.id
                    })}
                    isDeleteLoading={tempId === item.id && isDeleteLoading}
                    onPressDelete={() => {
                      setTempId(item.id)
                      onPressDelete(item.id)
                    }}
                  />
                )
              }}
              contentContainerStyle={{ gap: 12 }}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => {
                return (
                  <AppFlex flex={1} alignItems="center" justifyContent="center">
                    <AppText style={{ fontSize: normalize(16) }} colour="gray200">Empty List</AppText>
                  </AppFlex>
                )
              }}
            />
        }
      </AppFlex>
      {/* bottom sheet add */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <AppFlex style={styles.wrapperAddToDo}>
            <AppText bold style={styles.txtHeader}>Create ToDo</AppText>
            <AppTextInput
              onChange={onChange}
              value={value}
              isCenter={false}
              placeholder={'description'}
            />
            <AppButton
              title="Submit"
              onPress={() => {
                onCreateTodo();
              }}
              loading={isLoadingTodo}
            />
          </AppFlex>
        </BottomSheetView>
      </BottomSheet>

      {/* bottom sheet edit */}
      <BottomSheet
        ref={updateSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          <AppFlex style={styles.wrapperAddToDo}>
            <AppText bold style={styles.txtHeader}>Update ToDo</AppText>
            <AppTextInput
              onChange={onChangeUpdate}
              value={selectedValue}
              isCenter={false}
              placeholder={'description'}
            />
            <AppButton
              title="Update"
              onPress={() => {
                onUpdateToDo();
              }}
              loading={isLoadingUpdateTodo}
            />
          </AppFlex>
        </BottomSheetView>
      </BottomSheet>
      <AppFlex style={{ zIndex: -999 }}>
        <AppButton
          title="Logout"
          onPress={onPressLogout}
          variant="transparent"
          textColor="red"
        />
      </AppFlex>
    </Layout>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  txtHeader: {
    fontSize: normalize(26),
  },
  clear: {
    gap: 12,
    marginTop: normalize(16, 'height')
  },
  contentContainer: {
    flex: 1,
  },
  wrapperAddToDo: {
    gap: 20,
    paddingHorizontal: normalize(16),
  },
  btnAdd: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOURS.primary,
  },
  txtPlus: {
    fontSize: normalize(32)
  },
  toDoWrapper: {
    marginVertical: normalize(26, 'height')
  }
});

export default memo(ToDoView);
