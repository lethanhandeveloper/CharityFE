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
import { ConfirmDialogIcon } from '@components/ConfirmDialog';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function OppositeContentTimeline({ campaignId }: { campaignId: string }) {
  const dispatch = useAppDispatch();
  const [list, setList] = React.useState<WithDrawUI[]>([]);
  const [message, setMessage] = React.useState<string>('');
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
  const onTransfer = async (id: string, status: string) => {
    try {
      await campaign.approveRequest(id, status, message);
      await campaign.withDraw(id);
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể thực hiện rút tiền!', open: true, type: 'error' }));
    }
  };
  return (
    <Timeline position='alternate'>
      {list.map((item, index) => (
        <>
          <TimelineItem key={item.id}>
            <TimelineOppositeContent color='text.secondary'>{item.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color='secondary' />

              {item.timeApprove && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              Yêu cầu rút {item.value}
              {!item.timeApprove && (
                <>
                  <ConfirmDialogIcon
                    icon={<CheckCircleIcon />}
                    message='Xác nhận duyệt yêu cầu rút tiền'
                    setMessage={setMessage}
                    onSucess={() => onTransfer(item.id, 'Approve')}
                    title='Xác nhận rút tiền'
                  />
                  <ConfirmDialogIcon
                    icon={<UnpublishedIcon />}
                    setMessage={setMessage}
                    message='Xác nhận từ chối yêu cầu rút tiền'
                    onSucess={() => onTransfer(item.id, 'Reject')}
                    title='Xác nhận rút tiền'
                  />
                </>
              )}
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
                <TimelineContent>Đã hủy yêu cầu {item.value}</TimelineContent>
              </TimelineItem>
            ))}
        </>
      ))}
    </Timeline>
  );
}
