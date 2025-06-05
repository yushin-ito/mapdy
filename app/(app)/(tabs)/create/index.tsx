import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/client";
import { useCursorInfiniteScrollQuery } from "@supabase-cache-helpers/postgrest-swr";
import { format } from "date-fns";
import { enUS, ja } from "date-fns/locale";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from "react-native-calendars";
import * as R from "remeda";

LocaleConfig.locales.en = LocaleConfig.locales[""];
LocaleConfig.locales.ja = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};

const CalendarPage = () => {
  const { t, i18n } = useTranslation("");

  const { session } = useAuth();

  const {
    data: posts,
    loadMore,
    isLoading,
  } = useCursorInfiniteScrollQuery(
    () =>
      supabase
        .from("posts")
        .select("id, title, description, created_at")
        .eq("user_id", session?.user.id ?? "")
        .order("created_at", { ascending: false })
        .order("id", { ascending: true })
        .limit(10),
    {
      orderBy: "created_at",
      uqOrderBy: "id",
    },
  );

  const sections = useMemo(() => {
    if (!posts) {
      return [];
    }

    const result = R.pipe(
      posts.flat(),
      R.groupBy((post) => format(new Date(post.created_at), "yyyy-MM-dd")),
      R.entries(),
      R.map(([title, data]) => ({ title, data })),
    );

    return result;
  }, [posts]);

  const markedDates = useMemo(() => {
    return R.reduce(
      sections,
      (acc, section) => {
        acc[section.title] = { marked: true };
        return acc;
      },
      {} as Record<string, { marked: boolean }>,
    );
  }, [sections]);

  if (isLoading) {
    return null;
  }

  return (
    <CalendarProvider date={new Date().toDateString()}>
      <ExpandableCalendar
        markedDates={markedDates}
        markingType="dot"
        hideArrows
        allowShadow={false}
        closeOnDayPress={false}
        firstDay={1}
        theme={{
          textDayFontWeight: "500",
          textMonthFontWeight: "500",
          selectedDayBackgroundColor: "",
          todayTextColor: "",
          dotColor: "",
          calendarBackground: "",
          dayTextColor: "",
          monthTextColor: "",
          textSectionTitleColor: "",
        }}
      />
      <AgendaList
        markToday={false}
        dayFormatter={(date) =>
          format(new Date(date), "PPP (E)", {
            locale: i18n.language === "en" ? enUS : ja,
          })
        }
        renderItem={() => null}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => null}
        sections={sections}
        sectionStyle={{ backgroundColor: "" }}
      />
    </CalendarProvider>
  );
};

export default CalendarPage;
