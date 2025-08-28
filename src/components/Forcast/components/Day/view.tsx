import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ForecastdayType } from "../../../../types";

interface DayProps {
  record: ForecastdayType;
  setShowDetails: Dispatch<
    SetStateAction<{
      id: string;
      show: boolean;
    }>
  >;
}

export const Day: React.FC<DayProps> = ({ record, setShowDetails }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        "&:hover": {
          backgroundColor: "action.selected",
        },
      }}
    >
      <CardContent sx={{ pb: { xs: 0, sm: 4 } }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{ xs: "row" }}
        >
          <Typography
            component={"div"}
            variant="body2"
            fontWeight={500}
            mb={{ xs: 1, sm: 0 }}
            color="text.secondary"
          >
            {record.date}
          </Typography>
          <Chip label={record.location} color="primary" />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <img
            src={record.condition.icon}
            alt={record.condition.text}
            width={64}
            height={64}
            loading="lazy"
          />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              component={"div"}
              variant="h3"
              fontSize={{ xs: "14px", md: "24px" }}
              fontWeight={500}
              color="text.secondary"
            >
              {record.maxTem}&deg;
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h5"
          component="h2"
          my={{ xs: 1, md: 3 }}
          color="text.secondary"
        >
          {record.condition.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            setShowDetails({
              id: record.id,
              show: true,
            })
          }
        >
          Show details
        </Button>
      </CardActions>
    </Card>
  );
};
