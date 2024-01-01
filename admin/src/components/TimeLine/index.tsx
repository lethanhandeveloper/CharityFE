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
import { mapWithDaws } from '@services/mapdata/requestDraw';
import { WithDrawUI } from '@models/contract';
import TimelineDot from '@mui/lab/TimelineDot';
import ConfirmDialog from '@components/ConfirmDialog';

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
  const onTransfer = async (id: string) => {
    try {
      await campaign.approveRequest(id, 'Approve', 'message test');
      await campaign.withDraw(id);
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể thực hiện rút tiền!', open: true, type: 'error' }));
    }
  };
  return (
    <Timeline position='alternate'>
      {list.map((item) => (
        <>
          <TimelineItem key={item.id}>
            <TimelineOppositeContent color='text.secondary'>{item.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Yêu cầu rút {item.value}{' '}
              <ConfirmDialog
                buttonText='Rút tiền'
                message='Xác nhận rút tiền'
                onSucess={() => onTransfer(item.id)}
                title='Xác nhận rút tiền'
              />
            </TimelineContent>
          </TimelineItem>
          {item.timeApprove &&
            (item.status === 'Approve' ? (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent color='text.secondary'>
                  {item.timeApprove}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color='success' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Đã thực hiện giao dịch {item.value}</TimelineContent>
              </TimelineItem>
            ) : (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent color='text.secondary'>
                  {item.timeApprove}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Đã hủy yêu cầu {item.value}</TimelineContent>
              </TimelineItem>
            ))}
        </>
      ))}
    </Timeline>
  );
}
