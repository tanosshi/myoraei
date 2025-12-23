import { StyleSheet } from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.headlineMedium,
    color: COLORS.onSurface,
  },
  headerActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
  fabButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: 140,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.titleLarge,
    color: COLORS.onSurface,
    marginTop: SPACING.md,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: RADIUS.xxl,
    padding: SPACING.lg,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.headlineSmall,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  modalInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.onSurface,
    paddingVertical: SPACING.md,
  },
  descInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  modalButtonOutline: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.outline,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonOutlineText: {
    fontFamily: "Inter_500Medium",
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.primary,
  },
  modalButtonFilled: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonFilledText: {
    fontFamily: "Inter_500Medium",
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.onPrimary,
  },
});
