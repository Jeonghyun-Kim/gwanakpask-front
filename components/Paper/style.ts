interface PaperProps {
  background: string;
  color: string;
}

export const styles: PaperProps[] = [
  {
    background: '#ffffff',
    color: '#000000',
  },
  {
    background: '#424242',
    color: '#ffffff',
  },
  {
    background:
      'linear-gradient(135deg, rgba(255,249,196,1) 0%, rgba(229,242,241,1) 100%)',
    color: '#151d5f',
  },
  {
    background: '#a7ffeb',
    color: '#6a0246',
  },
  {
    background:
      'linear-gradient(135deg, rgba(194,228,251,1) 0%, rgba(232,186,206,1) 100%)',
    color: '#0c4528',
  },
  {
    background: '#fce4ec',
    color: '#760f0f',
  },
  {
    background: '#fff3e0',
    color: '#163900',
  },
  {
    background: '#e1f5fe',
    color: '#000000',
  },
];

export default {
  styles,
};
