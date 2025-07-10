import clsx from "clsx";
import { forwardRef, ReactNode } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

const styles = {
  base: [
    'relative flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold',
    'px-3.5 py-2.5',
    'focus:outline-2 focus:outline-offset-2 focus:outline-blue-500',
    'disabled:opacity-50',
  ],
  solid: [
    'border-transparent',
    'hover:bg-opacity-10'
  ],
  outline: [
    'border-zinc-950/10 text-zinc-950 active:bg-zinc-950/5 hover:bg-zinc-950/5',
    'dark:border-white/15 dark:text-white dark:active:bg-white/5 dark:hover:bg-white/5',
  ],
  plain: [
    'border-transparent text-zinc-950 active:bg-zinc-950/5 hover:bg-zinc-950/5',
    'dark:text-white dark:active:bg-white/10 dark:hover:bg-white/10',
  ],
  colors: {
    'dark/zinc': [
      'text-white bg-zinc-900',
      'dark:text-white dark:bg-zinc-600',
    ],
    light: [
      'text-zinc-950 bg-white border-zinc-950/10 active:border-zinc-950/15 hover:border-zinc-950/15',
      'dark:text-white dark:bg-zinc-800',
    ],
    'dark/white': [
      'text-white bg-zinc-900',
      'dark:text-zinc-950 dark:bg-white',
    ],
    dark: [
      'text-white bg-zinc-900',
      'dark:bg-zinc-800',
    ],
    white: [
      'text-zinc-950 bg-white border-zinc-950/10 active:border-zinc-950/15 hover:border-zinc-950/15',
    ],
    zinc: [
      'text-white bg-zinc-600 border-zinc-700/90',
    ],
    indigo: [
      'text-white bg-indigo-500 border-indigo-600/90',
    ],
    cyan: [
      'text-cyan-950 bg-cyan-300 border-cyan-400/80',
    ],
    red: [
      'text-white bg-red-600 border-red-700/90',
    ],
    orange: [
      'text-white bg-orange-500 border-orange-600/90',
    ],
    amber: [
      'text-amber-950 bg-amber-400 border-amber-500/80',
    ],
    yellow: [
      'text-yellow-950 bg-yellow-300 border-yellow-400/80',
    ],
    lime: [
      'text-lime-950 bg-lime-300 border-lime-400/80',
    ],
    green: [
      'text-white bg-green-600 border-green-700/90',
    ],
    emerald: [
      'text-white bg-emerald-600 border-emerald-700/90',
    ],
    teal: [
      'text-white bg-teal-600 border-teal-700/90',
    ],
    sky: [
      'text-white bg-sky-500 border-sky-600/80',
    ],
    blue: [
      'text-white bg-blue-600 border-blue-700/90',
    ],
    violet: [
      'text-white bg-violet-500 border-violet-600/90',
    ],
    purple: [
      'text-white bg-purple-500 border-purple-600/90',
    ],
    fuchsia: [
      'text-white bg-fuchsia-500 border-fuchsia-600/90',
    ],
    pink: [
      'text-white bg-pink-500 border-pink-600/90',
    ],
    rose: [
      'text-white bg-rose-500 border-rose-600/90',
    ],
  },
};

type ButtonProps = (
    | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
    | { color?: never; outline: true; plain?: never }
    | { color?: never; outline?: never; plain: true }
) & { className?: string; children: ReactNode } & Omit<PressableProps, 'className'>;

export const Button = forwardRef<View, ButtonProps>(function Button({
    color,
    className,
    outline,
    plain,
    children,
    ...props
}, ref) {
    let classes = clsx(
        className,
        styles.base,
        outline ? styles.outline : plain ? styles.plain : clsx(styles.solid, styles.colors[color ?? 'dark/zinc'])
    )

    return (
        <Pressable
            className={classes}
            {...props}
            ref={ref}
        >
            <TouchTarget>
                <Text className={clsx(classes, "text-inherit")}>
                    {children}
                </Text>
            </TouchTarget>
        </Pressable>
    );
});

export function TouchTarget({ children }: { children: React.ReactNode }) {
    return (
        <>
            <View
                className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            />
            {children}
        </>
    );
}


