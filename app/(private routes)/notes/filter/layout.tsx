// app/notes/filter/layout.tsx

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
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;
