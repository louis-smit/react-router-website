import iconsHref from "~/icons.svg";
import { DetailsMenu } from "~/modules/details-menu";
import { DetailsPopup } from "./details-popup";
import { PopupLabel } from "./popup-label";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { useHeaderData } from "./docs-header/use-header-data";
import { useDocLayoutId } from "./use-doc-layout-id";
import { useNavigation } from "~/hooks/use-navigation";

export function VersionSelect() {
  let { versions, latestVersion, releaseBranch, branches, currentGitHubRef } =
    useHeaderData();
  let layoutId = useDocLayoutId();

  // This is the same default, hover, focus style as the ColorScheme trigger
  const className =
    "border border-transparent bg-gray-100 hover:bg-gray-200 focus:border focus:border-gray-100 focus:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:border-gray-400 dark:focus:bg-gray-700";

  let label = currentGitHubRef === releaseBranch ? "latest" : currentGitHubRef;
  return (
    <DetailsMenu className="group relative">
      <summary
        title={label}
        className={`_no-triangle whitespace-nowrap overflow-hidden w-24 relative flex h-[40px] cursor-pointer list-none items-center justify-between gap-3 rounded-l-full px-3 ${className}`}
      >
        <div>{label}</div>
        <svg aria-hidden className="h-[18px] w-[18px] text-gray-400">
          <use href={`${iconsHref}#dropdown-arrows`} />
        </svg>
      </summary>
      <DetailsPopup className="w-40">
        <PopupLabel label="Branches" />
        {branches.map((branch) => (
          <VersionLink
            key={branch}
            to={
              releaseBranch === branch
                ? `/${layoutId}`
                : `/${branch}/${layoutId}`
            }
          >
            {releaseBranch === branch ? `latest (${latestVersion})` : branch}
          </VersionLink>
        ))}

        <PopupLabel label="Versions" />
        {versions.map((version) => (
          <VersionLink key={version} to={`/${version}/${layoutId}`}>
            {version}
          </VersionLink>
        ))}
        <VersionLink key={"4/5.x"} to="https://v5.reactrouter.com/">
          v4/5.x
        </VersionLink>
        <VersionLink
          key={"3.x"}
          to="https://github.com/remix-run/react-router/tree/v3.2.6/docs"
        >
          v3.x
        </VersionLink>
      </DetailsPopup>
    </DetailsMenu>
  );
}

function VersionLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  let isExternal = to.startsWith("http");
  let { isActive } = useNavigation(to);
  let className =
    "relative pl-4 group items-center flex py-1 before:mr-4 before:relative before:top-px before:block before:h-1.5 before:w-1.5 before:rounded-full before:content-['']";

  if (isExternal) {
    return (
      <a
        href={to}
        className={classNames(
          className,
          "after:absolute after:right-4 after:top-1 after:block after:-rotate-45 after:opacity-50 after:content-['→']",
          // Same as !isActive styles on <Link> below
          "hover:bg-gray-50 active:text-red-brand dark:text-gray-200 dark:hover:bg-gray-700 dark:active:text-red-brand"
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      className={classNames(
        className,
        isActive
          ? "font-bold text-red-brand before:bg-red-brand"
          : "hover:bg-gray-50 active:text-red-brand dark:text-gray-200 dark:hover:bg-gray-700 dark:active:text-red-brand before:bg-transparent"
      )}
      to={to}
    >
      {children}
    </Link>
  );
}
