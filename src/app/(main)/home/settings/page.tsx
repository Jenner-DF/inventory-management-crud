import { AccountSettings } from "@stackframe/stack";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">
          Update your preferences and account settings.
        </p>
      </div>
      <AccountSettings fullPage />
    </div>
  );
}
