import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

export function SearchPage() {
  return (
    <div>
      <Tabs defaultValue="villa">
        <TabsList>
          <TabsTrigger value="villa">빌라/주택</TabsTrigger>
          <TabsTrigger value="apt" disabled>
            아파트/오피스텔
          </TabsTrigger>
          <TabsTrigger value="room" disabled>
            원룸/투룸
          </TabsTrigger>
          <TabsTrigger value="business" disabled>
            상가/업무/공장/토지
          </TabsTrigger>
        </TabsList>
        <TabsContent value="villa">villa</TabsContent>
        <TabsContent value="apt">apt</TabsContent>
        <TabsContent value="room">room</TabsContent>
        <TabsContent value="business">business</TabsContent>
      </Tabs>
    </div>
  );
}
