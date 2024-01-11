import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import campaign from '@services/ethers/campaign';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import TimelineDot from '@mui/lab/TimelineDot';
import { WithDrawUI } from '@models/withdraw';
import { mapWithDaws } from '@mapdata/withdraw';
import serviceAPI from '@services/api';
import { TypeSpecimenTwoTone } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export default function OppositeContentTimeline({ campaignId }: { campaignId: string }) {
  const dispatch = useAppDispatch();
  const [list, setList] = React.useState<WithDrawUI[]>([]);

  React.useEffect(() => {
    const initData = async () => {
      try {
        const result = await campaign.getRequestByCampaign(campaignId);
        setList(mapWithDaws(result));
      } catch (error) {
        dispatch(
          setInfoAlert({ title: 'Không thể thực hiện rút tiền!', open: true, type: 'error' }),
        );
      }
    };
    initData();
  }, [campaignId]);
  const handleOpenFile = async (fileId: string) => {
    const data = await serviceAPI.file.getFile(fileId);

    window.open(
      data.data.result?.fileUrl,
      '_blank', // <- This is what makes it open in a new window.
    );
  };

  return (
    <Timeline position='alternate'>
      {list.map((item, index) => (
        <>
          <TimelineItem key={item.id}>
            <TimelineOppositeContent color='text.secondary'>
              {item.time}
              <Tooltip title='Xem file'>
                <TypeSpecimenTwoTone
                  onClick={() => {
                    handleOpenFile(item.fileUrl);
                  }}
                >
                  Xem file
                </TypeSpecimenTwoTone>
              </Tooltip>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color='secondary' />

              {item.timeApprove && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>Yêu cầu rút {item.value}</TimelineContent>
          </TimelineItem>
          {item.timeApprove !== item.time &&
            (item.status === 'Approve' ? (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent color='text.secondary'>
                  {item.timeApprove}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color='success' />
                  {index < list.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>Đã thực hiện giao dịch {item.value}</TimelineContent>
              </TimelineItem>
            ) : (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent color='text.secondary'>
                  {item.timeApprove}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color='error' />
                  {index < list.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>Đã hủy yêu cầu rút tiền {item.value}</TimelineContent>
              </TimelineItem>
            ))}
        </>
      ))}
    </Timeline>
  );
}
