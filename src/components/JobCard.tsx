import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Job} from '../types/Job';
import {colors, spacing, borderRadius, typography} from '../theme/colors';

interface JobCardProps {
  job: Job;
  onPress: () => void;
  onToggleApplying: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onPress,
  onToggleApplying,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {job.title}
        </Text>
        <View style={[styles.badge, job.isApplying && styles.applyingBadge]}>
          <Text
            style={[
              styles.badgeText,
              job.isApplying && styles.applyingBadgeText,
            ]}>
            {job.isApplying ? 'Applying' : 'New'}
          </Text>
        </View>
      </View>

      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {job.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.source}>{job.source}</Text>
        <TouchableOpacity
          style={[
            styles.applyButton,
            job.isApplying && styles.applyingButton,
          ]}
          onPress={onToggleApplying}>
          <Text
            style={[
              styles.applyButtonText,
              job.isApplying && styles.applyingButtonText,
            ]}>
            {job.isApplying ? '✓ Applying' : 'Mark as Applying'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 24,
  },
  badge: {
    backgroundColor: colors.blue50,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.blue100,
  },
  applyingBadge: {
    backgroundColor: colors.green50,
    borderColor: colors.green100,
  },
  badgeText: {
    ...typography.captionMedium,
    color: colors.blue600,
  },
  applyingBadgeText: {
    color: colors.green600,
  },
  company: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  source: {
    ...typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 1,
    borderRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  applyingButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  applyButtonText: {
    color: colors.white,
    ...typography.button,
    fontSize: 13,
  },
  applyingButtonText: {
    color: colors.white,
  },
});
