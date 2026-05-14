'use client';

import ReactMarkdown from 'react-markdown';

export type ChatRole = 'user' | 'assistant' | 'system';

type Props = {
  role: ChatRole;
  content: string;
  timestamp?: string;
  index?: number;
};

export function MessageBubble({ role, content, timestamp, index }: Props) {
  if (role === 'system') {
    return (
      <div className="cosmo-msg cosmo-msg--system" role="status">
        {content}
      </div>
    );
  }

  const isUser = role === 'user';
  const label = isUser ? 'You' : 'Q.';

  return (
    <article className="cosmo-msg" data-role={role}>
      <header className="cosmo-msg__label" data-role={role}>
        <span>
          {label}
          {!isUser && typeof index === 'number'
            ? ` ${String(index).padStart(2, '0')}`
            : ''}
        </span>
        {timestamp ? <span className="cosmo-msg__time">· {timestamp}</span> : null}
      </header>
      <div className="cosmo-msg__body">
        <ReactMarkdown
          allowedElements={[
            'p',
            'strong',
            'em',
            'a',
            'ul',
            'ol',
            'li',
            'code',
            'pre',
            'blockquote',
            'br',
          ]}
          components={{
            a: (props) => (
              <a
                {...props}
                target={props.href?.startsWith('http') ? '_blank' : undefined}
                rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default MessageBubble;
