import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import navDetails from "./navDetails";

const QuestionNavigation = ({ setStage }: { setStage: any }) => {
  const router = useRouter();

  const handleHome = (location: string) => {
    router.push(location);
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navDetails.map((navDetail) => {
          return (
            <>
              <BreadcrumbItem key={navDetail.id}>
                <BreadcrumbLink>
                  <Button
                    id={navDetail.id}
                    variant="link"
                    size="sm"
                    onClick={() => setStage(navDetail.nav)}
                  >
                    {navDetail.title}
                  </Button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default QuestionNavigation;
