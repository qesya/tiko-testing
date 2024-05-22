import AppFlex from '@components/AppFlex/AppFlex';
import { COLOURS } from '@theme/colours';
import normalize from '@utils/normalize';
import React, { ReactNode, memo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

interface ILayout {
  children: ReactNode,
  isCenter?: boolean,
  isScrollable?: boolean
}

const Layout: React.FC<ILayout> = memo(({
  children,
  isCenter = false,
  isScrollable = false,
}) => {
  return (
    <SafeAreaView style={styles.outer}>
      {
        isScrollable ?
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}>
            <AppFlex style={[
              styles.wrapper,
              isCenter && styles.center
            ]}>
              {children}
            </AppFlex>
          </ScrollView>
          :
          <AppFlex style={[
            styles.wrapper,
            isCenter && styles.center
          ]}>
            {children}
          </AppFlex>
      }
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },
  wrapper: {
    flexGrow: 1,
    paddingVertical: normalize(12, 'height'),
    backgroundColor: COLOURS.white,
    paddingHorizontal: normalize(16),
  },
  center: {
    justifyContent: 'center',
  }
});

export default Layout;
