import { DocumentHeaderLiveTime } from './DocumentHeaderLiveTime';
import { DocumentHeaderPrintedOn } from './DocumentHeaderPrintedOn';

export function DocumentHeader() {
  return (
    <div className="dpl-docheader">
      <div className="dpl-docheader__inner">
        <div className="dpl-docheader__left">
          <span>DPL · OPERATOR BRIEF</span>
          <span className="dpl-docheader__divider" aria-hidden />
          <span>VERSION 2026.05</span>
          <span className="dpl-docheader__divider" aria-hidden />
          <DocumentHeaderLiveTime />
        </div>
        <div className="dpl-docheader__right">
          <DocumentHeaderPrintedOn />
        </div>
      </div>
    </div>
  );
}

export default DocumentHeader;
