import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/rootReducer';
import { updateFooterTotals } from '@/app/redux/slices/purchase-order/purchaseOrderSlice';

export const usePurchaseOrderTotals = () => {
  const dispatch = useDispatch();
  const { items, footer } = useSelector((state: RootState) => state.purchaseOrderForm);

  // Calculate totals using useMemo
  const { total, discount, netTotal } = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.total, 0);
    const discount = items.reduce((sum, item) => sum + item.discount, 0);
    const netTotal = total - discount + footer.addition - footer.advance;
    return { total, discount, netTotal };
  }, [items, footer.addition, footer.advance]);

  // Update footer totals in Redux store
  useEffect(() => {
    dispatch(updateFooterTotals({ total, discount, netTotal }));
  }, [total, discount, netTotal, dispatch]);

  return { total, discount, netTotal };
};