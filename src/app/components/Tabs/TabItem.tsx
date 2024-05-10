import { Poppins } from 'next/font/google';
import { TitemsTab } from '.';

interface TabItemProps {
  itemsTab: TitemsTab;
  setTab: (tab: string) => void;
  tab: string;
}
const pop = Poppins({ weight: ['400'], subsets: ['latin'] });

const TabItem = ({ itemsTab, setTab, tab }: TabItemProps) => {
  return (
    <>
      <input
        type="radio"
        name="tabset"
        id={itemsTab.id}
        aria-controls={itemsTab.ariaName}
        checked={tab === itemsTab.id}
      />
      <label
        htmlFor="tab1"
        onClick={() => setTab(itemsTab.id)}
        className={pop.className}
      >
        {itemsTab.ariaName}
      </label>
    </>
  );
};

export default TabItem;

