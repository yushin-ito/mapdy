import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          tabBarIcon: () => <></>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <></>,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
