// Styles
import css from '@/app/(private routes)/notes/filter/LayoutNotes.module.css';

// Types
type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar} aria-label='Notes filters'>
        {sidebar}
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </section>
  );
};

export default NotesLayout;
