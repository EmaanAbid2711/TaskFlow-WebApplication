import {AtSign, Image, Smile} from "lucide-react";

function CommentBox() {
  return (
    <div className="border-t border-slate-100 bg-white p-4">
      <div className="flex gap-3">

        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
          className="h-8 w-8 rounded-full object-cover"
        />

        <div className="flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-[#0052cc]">
          <textarea
            rows={2}
            placeholder="Write a comment..."
            className="w-full resize-none px-3 py-2 text-sm outline-none"
          />

          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2">
            <div className="flex gap-3 text-slate-400">

              <button>
                <AtSign size={16} />
              </button>

              <button>
                <Smile size={16} />
              </button>

              <button>
                <Image size={16} />
              </button>

            </div>

            <button className="rounded-md bg-[#0052cc] px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
              Post Comment
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;